package tn.amenellah.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(tn.amenellah.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(tn.amenellah.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Article.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Article.class.getName() + ".achats", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Article.class.getName() + ".ventes", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Famille.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Famille.class.getName() + ".articles", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Fournisseur.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Fournisseur.class.getName() + ".achats", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Client.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Client.class.getName() + ".ventes", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Reglement.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Recouvrement.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Achat.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Achat.class.getName() + ".reglements", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Vente.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Vente.class.getName() + ".recouvrements", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Article.class.getName() + ".articleVentes", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Article.class.getName() + ".articleAchats", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Achat.class.getName() + ".articleAchats", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.Vente.class.getName() + ".articleVentes", jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.FactureAchat.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.ArticleVente.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.ArticleAchat.class.getName(), jcacheConfiguration);
            cm.createCache(tn.amenellah.domain.FactureVente.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
